package com.example.Language_Learning_App.Service;

import com.example.Language_Learning_App.Model.User;

public interface UserService {
    public User FindUserByJwt(String jwt) throws Exception;
    public User FindUserByEmail(String email) throws Exception;
}
