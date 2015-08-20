%This script generates fractals for the most basic touching conditions.
%Choosing fixed points [0,0,0] and [1,0,1], with touching condition order 1
%gives a Heisenberg Interval. Choosing a touching condition order of 2 or
%higher gives the Heisenberg Jaws.

clearvars;
global h1 h2 t1 t2 theta1 theta2 g1 g2 mixed1 sierpinsky;
sierpinsky = 0;

display('WELCOME TO THE BASIC HEISENBERG FRACTAL GENERATOR');
h1 = input('ENTER YOUR H1');
h2 = input('ENTER YOUR H2');
touching = input('HOW HIGH DO YOU WANT THE ORDER OF TOUCHING CONDITION TO BE?');
iterations = input('HOW MANY ITERATIONS?');
display('CAN WE GET MUCH HIGHER?');

mixed1 = false;

t1 = sym('t1');
t2 = sym('t2');
theta1 = sym('theta1');
theta2 = sym('theta2');


%Standard first order touching condition F1h2 = F2h1

F1h2 = [ h1(1) - t1*h1(1)*cos(theta1) + t1*h2(1)*cos(theta1) + t1*h1(2)*sin(theta1) - t1*h2(2)*sin(theta1), h1(2) - t1*h1(2)*cos(theta1) + t1*h2(2)*cos(theta1) - t1*h1(1)*sin(theta1) + t1*h2(1)*sin(theta1), t1^2*(h2(3) - (2*h1(3)*t1^2 + sin(theta1)*t1*h1(1)^2 + sin(theta1)*t1*h1(2)^2 - 2*h1(3))/(2*t1^2) + (h2(1)*(t1*h1(2) - h1(2)*cos(theta1) + h1(1)*sin(theta1)))/(2*t1) + (h2(2)*(h1(1)*cos(theta1) - t1*h1(1) + h1(2)*sin(theta1)))/(2*t1))];
F2h1 = [ h2(1) + t2*h1(1)*cos(theta2) - t2*h2(1)*cos(theta2) - t2*h1(2)*sin(theta2) + t2*h2(2)*sin(theta2), h2(2) + t2*h1(2)*cos(theta2) - t2*h2(2)*cos(theta2) + t2*h1(1)*sin(theta2) - t2*h2(1)*sin(theta2), t2^2*(h1(3) - (2*h2(3)*t2^2 + sin(theta2)*t2*h2(1)^2 + sin(theta2)*t2*h2(2)^2 - 2*h2(3))/(2*t2^2) + (h1(1)*(t2*h2(2) - h2(2)*cos(theta2) + h2(1)*sin(theta2)))/(2*t2) + (h1(2)*(h2(1)*cos(theta2) - t2*h2(1) + h2(2)*sin(theta2)))/(2*t2))];

%{
x = [t1, t2, theta1, theta2];

r = @(x) [h1(1) - x(1)*h1(1)*cos(x(3)) + x(1)*h2(1)*cos(x(3)) + x(1)*h1(2)*sin(x(3)) - x(1)*h2(2)*sin(x(3)) - (h2(1) + x(2)*h1(1)*cos(x(4)) - x(2)*h2(1)*cos(x(4)) - x(2)*h1(2)*sin(x(4)) + x(2)*h2(2)*sin(x(4))), h1(2) - x(1)*h1(2)*cos(x(3)) + x(1)*h2(2)*cos(x(3)) - x(1)*h1(1)*sin(x(3)) + x(1)*h2(1)*sin(x(3)) - (h2(2) + x(2)*h1(2)*cos(x(4)) - x(2)*h2(2)*cos(x(4)) + x(2)*h1(1)*sin(x(4)) - x(2)*h2(1)*sin(x(4))), x(1)^2*(h2(3) - (2*h1(3)*x(1)^2 + sin(x(3))*x(1)*h1(1)^2 + sin(x(3))*x(1)*h1(2)^2 - 2*h1(3))/(2*x(1)^2) + (h2(1)*(x(1)*h1(2) - h1(2)*cos(x(3)) + h1(1)*sin(x(3))))/(2*x(1)) + (h2(2)*(h1(1)*cos(x(3)) - x(1)*h1(1) + h1(2)*sin(x(3))))/(2*x(1))) - (x(2)^2*(h1(3) - (2*h2(3)*x(2)^2 + sin(x(4))*x(2)*h2(1)^2 + sin(x(4))*x(2)*h2(2)^2 - 2*h2(3))/(2*x(2)^2) + (h1(1)*(x(2)*h2(2) - h2(2)*cos(x(4)) + h2(1)*sin(x(4))))/(2*x(2)) + (h1(2)*(h2(1)*cos(x(4)) - x(2)*h2(1) + h2(2)*sin(x(4))))/(2*x(2))))];

sol = fsolve(r,[0.5,0.5,pi/2,pi/2]);
display(sol);

t1 = sol(1);
t2 = sol(2);
theta1 = sol(3);
theta2 = sol(4);
%}

%Mixed second order touching condition F1F2h1 = F2F1h2

%{
%F1F2h1
F1h2 = [ h1(1) - t1*h1(1)*cos(theta1) + t1*h2(1)*cos(theta1) + t1*h1(2)*sin(theta1) - t1*h2(2)*sin(theta1) + t1*t2*h1(1)*cos(theta1 + theta2) - t1*t2*h2(1)*cos(theta1 + theta2) - t1*t2*h1(2)*sin(theta1 + theta2) + t1*t2*h2(2)*sin(theta1 + theta2), h1(2) - t1*h1(2)*cos(theta1) + t1*h2(2)*cos(theta1) - t1*h1(1)*sin(theta1) + t1*h2(1)*sin(theta1) + t1*t2*h1(2)*cos(theta1 + theta2) - t1*t2*h2(2)*cos(theta1 + theta2) + t1*t2*h1(1)*sin(theta1 + theta2) - t1*t2*h2(1)*sin(theta1 + theta2), t1^2*(t2^2*(h1(3) - (2*h2(3)*t2^2 + sin(theta2)*t2*h2(1)^2 + sin(theta2)*t2*h2(2)^2 - 2*h2(3))/(2*t2^2) + (h1(1)*(t2*h2(2) - h2(2)*cos(theta2) + h2(1)*sin(theta2)))/(2*t2) + (h1(2)*(h2(1)*cos(theta2) - t2*h2(1) + h2(2)*sin(theta2)))/(2*t2)) - (2*h1(3)*t1^2 + sin(theta1)*t1*h1(1)^2 + sin(theta1)*t1*h1(2)^2 - 2*h1(3))/(2*t1^2) + ((h1(1)*cos(theta1) - t1*h1(1) + h1(2)*sin(theta1))*(h2(2) + t2*h1(2)*cos(theta2) - t2*h2(2)*cos(theta2) + t2*h1(1)*sin(theta2) - t2*h2(1)*sin(theta2)))/(2*t1) + ((t1*h1(2) - h1(2)*cos(theta1) + h1(1)*sin(theta1))*(h2(1) + t2*h1(1)*cos(theta2) - t2*h2(1)*cos(theta2) - t2*h1(2)*sin(theta2) + t2*h2(2)*sin(theta2)))/(2*t1))];

%F2F1h2
F2h1 = [ h2(1) + t2*h1(1)*cos(theta2) - t2*h2(1)*cos(theta2) - t2*h1(2)*sin(theta2) + t2*h2(2)*sin(theta2) - t1*t2*h1(1)*cos(theta1 + theta2) + t1*t2*h2(1)*cos(theta1 + theta2) + t1*t2*h1(2)*sin(theta1 + theta2) - t1*t2*h2(2)*sin(theta1 + theta2), h2(2) + t2*h1(2)*cos(theta2) - t2*h2(2)*cos(theta2) + t2*h1(1)*sin(theta2) - t2*h2(1)*sin(theta2) - t1*t2*h1(2)*cos(theta1 + theta2) + t1*t2*h2(2)*cos(theta1 + theta2) - t1*t2*h1(1)*sin(theta1 + theta2) + t1*t2*h2(1)*sin(theta1 + theta2), t2^2*(t1^2*(h2(3) - (2*h1(3)*t1^2 + sin(theta1)*t1*h1(1)^2 + sin(theta1)*t1*h1(2)^2 - 2*h1(3))/(2*t1^2) + (h2(1)*(t1*h1(2) - h1(2)*cos(theta1) + h1(1)*sin(theta1)))/(2*t1) + (h2(2)*(h1(1)*cos(theta1) - t1*h1(1) + h1(2)*sin(theta1)))/(2*t1)) - (2*h2(3)*t2^2 + sin(theta2)*t2*h2(1)^2 + sin(theta2)*t2*h2(2)^2 - 2*h2(3))/(2*t2^2) + ((h2(1)*cos(theta2) - t2*h2(1) + h2(2)*sin(theta2))*(h1(2) - t1*h1(2)*cos(theta1) + t1*h2(2)*cos(theta1) - t1*h1(1)*sin(theta1) + t1*h2(1)*sin(theta1)))/(2*t2) + ((t2*h2(2) - h2(2)*cos(theta2) + h2(1)*sin(theta2))*(h1(1) - t1*h1(1)*cos(theta1) + t1*h2(1)*cos(theta1) + t1*h1(2)*sin(theta1) - t1*h2(2)*sin(theta1)))/(2*t2))];
%}


%{
figure
ezsurf(F1h2(1),F1h2(2),F1h2(3),[-3,3,0,2*pi]);
hold on
ezsurf(F2h1(1),F2h1(2),F2h1(3),[-3,3,0,2*pi]);
%}

mid = (h1(3) + h2(3)) / 2;

sol = solve([F1h2(3) == mid, F2h1(3) == mid],[t1,t2]);
display(sol.t1);
display(sol.t2);



%There are multiple expressions of theta, so we need to solve for all of
%them to find which ones yield positive values of t.



for i = 1:size(sol.t1,1)
    theta1 = sym('theta1');
    theta2 = sym('theta2');
    t1 = sym('t1');
    t2 = sym('t2');
    
    
    eqns = subs([F1h2(1) == F2h1(1),F1h2(2) == F2h1(2)],[t1,t2],[sol.t1(i),sol.t2(i)]);
    %display(eqns);
    thetas = solve(eqns,[theta1,theta2]);
    if (size(thetas.theta1,1) == 0)
        continue
    end

    display(thetas.theta1);
    display(thetas.theta2);



    ts = subs([sol.t1(i),sol.t2(i)],[theta1,theta2],[thetas.theta1,thetas.theta2]);
    theta1 = thetas.theta1;
    theta2 = thetas.theta2;
    t1 = ts(1);
    t2 = ts(2);
    display(ts);
    
    
    %0.9654    0.5182    0.7363    0.7344
    %h1 = [0,0,0] h2 = [1,1,1]
    
    
    
    if t1 > 0 && t2 > 0
       break;
    end
    if i == size(sol.t1,1)
        display('CONTRACTION RATIOS ARE FORCED TO BE NEGATIVE');
    end
    


end




t1 = t1^(1 / touching);
t2 = t2^(1 / touching);
theta1 = theta1 / touching;
theta2 = theta2 / touching;



run('fractal')