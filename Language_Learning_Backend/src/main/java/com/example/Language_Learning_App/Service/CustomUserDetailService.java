package com.example.Language_Learning_App.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.Language_Learning_App.Model.USER_ROLE;
import com.example.Language_Learning_App.Model.User;
import com.example.Language_Learning_App.Repository.UserRepo;

@Service
public class CustomUserDetailService implements UserDetailsService{

    @Autowired
    private UserRepo userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null){
            throw new UsernameNotFoundException("User not found with email "+username);
        }
        USER_ROLE role = user.getRole();
        if (role == null){
            role = USER_ROLE.ROLE_USER;
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.toString()));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
        //changes made here
        //meaning of this line?
        //this line is used to return the user details.
    }
}
