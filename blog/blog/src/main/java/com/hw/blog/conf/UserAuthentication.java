package com.hw.blog.conf;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

/**
 * 邮件用户安全验证的类
 *
 * @author Administrator
 */
public class UserAuthentication extends Authenticator {
    private String userName;
    private String password;

    public UserAuthentication(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(userName, password);
    }
}

