package sem.semi.entities;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "user")

@NoArgsConstructor
@AllArgsConstructor

public class UserEntity{
    @Field("_id")
    private @MongoId String _id;
    @Field("email")
    private String email;
    @Field("password")
    private String[] pass;
    @Field("confirmed")
    private boolean confirmed;
    @Field("name")
    private String name;
    @Field("authority")
    private String authority;

    @Transient
    private String password;

    public UserEntity(String _id, String email, String[] pass, String password, boolean confirmed, String name, String authority) {
        this._id = _id;
        this.email = email;
        this.pass = pass;
        this.confirmed = confirmed;
        this.name = name;
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }


    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String[] getPass() {
        return pass;
    }

    public void setPass(String[] pass) {
        this.pass = pass;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
