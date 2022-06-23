import bcrypt

from flask import Flask, request, jsonify, url_for, render_template
from flask_mongoengine import MongoEngine
from flask_mail import Mail
from email_sending import send_email
from token_gen import confirm_token, generate_confirmation_token


app = Flask(__name__)
app.config.from_object('config.BaseConfig')
mail = Mail(app)
db = MongoEngine()
db.init_app(app)


class User(db.Document):
    name = db.StringField()
    email = db.StringField()
    password = db.ListField(db.StringField())
    confirmed = db.BooleanField()


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']

        users = User.objects.filter(name=name)
        if len(users) > 0:
            name_exists_error = {
                'message': 'User with given name already exists'
            }
            return jsonify(name_exists_error), 409
        
        users = User.objects.filter(email=email)
        if len(users) > 0:
            email_exists_error = {
                'message': 'User with given email already exists'
            }
            return jsonify(email_exists_error), 409

        if len(password) < 6:
            pass_to_short_error = {
                'message': 'Password must have more than 5 characters'
            }
            return jsonify(pass_to_short_error), 400

        hashed_pass = [
            bcrypt.hashpw(bytes(c, 'utf-8'), bcrypt.gensalt()).decode('utf-8')
            for c in password
        ]

        user = User(name=name, email=email, password=hashed_pass, confirmed=False)
        user.save()

        token = generate_confirmation_token(app, user.email)
        confirm_url = url_for('confirm_email', token=token, _external=True)
        html = render_template('activate.html', confirm_url=confirm_url)
        subject = 'Email confirmation'
        send_email(app, mail, user.email, subject, html)

        all_data = {
            'name': name, 
            'mail': email,
            'message': 'User registered successfully'
        }
        
        return jsonify(all_data), 202


@app.route('/register/<token>')
def confirm_email(token):
    try:
        email = confirm_token(app, token)
    except:
        return jsonify({
                'message': 'The confirmation link is invalid or has expired.'
            }), 404
    
    # Get user with given email
    user = User.objects.get(email=email)
    
    # Check if user already confirmed email
    if user.confirmed:
        return jsonify({'message': 'Account already confirmed. Please log in.'}), 200

    user.confirmed = True
    user.save()
    return jsonify({'message': 'You have confirmed your account. Thanks!'}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)