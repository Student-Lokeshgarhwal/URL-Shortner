Authentication:-
task -- if user signedup and loggedIn then only can create short-urls.

create page --    signup (ejs)  -- form -- user create in db
create page --    login (ejs) -- form -- create user sessionId (cookie)
% cookie creates using sessionId and before that, i have to join/bind sessionId with currentuser
% To bind/join sessionId with currentuser -- 
setuser & getuser using Map() object
middleware -- work below
check sessionId exists and the check currentuser connect with that if both true currentuser assign to req.user.

task2 -- only loggedin user can see their own urls as well as generate.