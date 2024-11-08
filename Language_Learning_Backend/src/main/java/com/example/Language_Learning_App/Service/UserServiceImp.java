package com.example.Language_Learning_App.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Language_Learning_App.Config.JwtProvider;
import com.example.Language_Learning_App.Model.User;
import com.example.Language_Learning_App.Repository.UserRepo;

@Service
public class UserServiceImp implements UserService {
     @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepo userRepository;
    @Override
    public User FindUserByJwt(String jwt) throws Exception {
        try{
            String email = jwtProvider.GetEmailfromJwt(jwt);
            User user = userRepository.findByEmail(email);
            if (user == null){
                throw new Exception("User not found");
            }
            return user;
        }
        catch (Exception e){
            throw new Exception("Invalid token");
        }
    }

    @Override
    public User FindUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null){
            throw new Exception("User not found");
        }
        return user;
    }

    @Override
    public User UpdateExpereince(String email, Long exp) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null){
            throw new Exception("User not found");
        }
        user.setExperiencePoints(user.getExperiencePoints()+exp);;
        User saved_user = userRepository.save(user);
        return saved_user;
    }
}
