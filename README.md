#HOW TO RUN
  This project is deployed using Vercel.
  LIVE LINK:  https://users-card-neon.vercel.app/   
  E-mail: eve.holt@reqres.in
  Password: cityslicka

(Navigation using React Router)
#Components:
    Login : 1. Login interface for users
            2. API handeling using AXIOS
            3. Authentication using 'POST/api/login' implemented in loginClick() function.
            4. Additinal feature added for password visibility.
            
  UserList : 1. one user per page rendered.
             2. providered functionalities to edit / delete information through saveClick() / delClick() function
             3. Proper alerts occur hence notifieng user regarding any updates.
             4. Different pages are navigated using 'React Router'
             5. Persistency is handeled through storing essential data in localStorage
             6. Pages are enumerated. 

  App : 1. All the routes are defined in this component ex:- Login -> '/' (default route)

  EndPage : An additional page provided incase user delates all data (edge case)
