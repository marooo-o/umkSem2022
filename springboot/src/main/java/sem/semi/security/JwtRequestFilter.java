package sem.semi.security;

import io.jsonwebtoken.ExpiredJwtException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import sem.semi.services.UserService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final UserService jwtUserDetailsService;
    private final JwtTokenUtil jwtTokenUtil;

    public JwtRequestFilter(@Lazy UserService jwtUserDetailsService, JwtTokenUtil jwtTokenUtil) {
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");

        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");

        if(requestTokenHeader != null) {
            if (StringUtils.startsWith(requestTokenHeader, "Bearer ")) {
                String jwtToken = requestTokenHeader.substring(7);
                try {
                    String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
                    if (StringUtils.isNotEmpty(username)
                            && null == SecurityContextHolder.getContext().getAuthentication()) {
                        UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);
                        if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
                            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                                    new UsernamePasswordAuthenticationToken(
                                            userDetails, null, userDetails.getAuthorities());
                            usernamePasswordAuthenticationToken
                                    .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext()
                                    .setAuthentication(usernamePasswordAuthenticationToken);
                        }
                    }
                } catch (IllegalArgumentException e) {
                    logger.error("Unable to fetch JWT Token");
                } catch (ExpiredJwtException e) {
                    logger.error("JWT Token is expired");
                } catch (Exception e) {
                    logger.error(e.getMessage());
                }
            } else {
                logger.warn("JWT Token does not begin with Bearer String");
            }
        }
        chain.doFilter(request, response);
    }

}
