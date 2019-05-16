%Sets the parameters for a Heisenberg Snowflake

%global h t theta g;
clearvars;

t(1) = 1/sqrt(3);
theta(1) = pi/6;

for (i = 2:7)
    t(i) = 1/3;
    theta(i) = 0;
end

%{
z1 = sym('z1');
z2 = sym('z2');
z3 = sym('z3');
z4 = sym('z4');
z5 = sym('z5');
z6 = sym('z6');
z7 = sym('z7');


t(1) = 1/sqrt(3);
theta(1) = pi/6;

for (i = 2:7)
    t(i) = 1/3;
    theta(i) = 0;
end

for (i = 1:7)
   g0(i,:) = [ (h0(i,1)*cos(theta(i)) - t(i)*h0(i,1) + h0(i,2)*sin(theta(i)))/t(i), -(t(i)*h0(i,2) - h0(i,2)*cos(theta(i)) + h0(i,1)*sin(theta(i)))/t(i), -(2*h0(i,3)*t(i)^2 + sin(theta(i))*t(i)*h0(i,1)^2 + sin(theta(i))*t(i)*h0(i,2)^2 - 2*h0(i,3))/(2*t(i)^2)]; 
end

eqn1 = Fz(h0(4,:),1/3,0,g0(2,:)) == Fz(h0(7,:),1/3,0,g0(3,:));
eqn2 = Fz(h0(5,:),1/3,0,g0(3,:)) == Fz(h0(2,:),1/3,0,g0(4,:));
eqn3 = Fz(h0(6,:),1/3,0,g0(4,:)) == Fz(h0(3,:),1/3,0,g0(5,:));
eqn4 = Fz(h0(7,:),1/3,0,g0(5,:)) == Fz(h0(4,:),1/3,0,g0(6,:));
eqn5 = Fz(h0(2,:),1/3,0,g0(6,:)) == Fz(h0(5,:),1/3,0,g0(7,:));
eqn6 = Fz(h0(3,:),1/3,0,g0(7,:)) == Fz(h0(6,:),1/3,0,g0(2,:));

sol = solve([eqn1,eqn2,eqn3,eqn4,eqn5],[z2,z3,z4,z5,z6,z7]);
display(sol);

z2 = sol.z2;
z3 = sol.z3;
z4 = sol.z4;
z5 = sol.z5;
z6 = sol.z6;
z7 = sol.z7;

h(1,:) = [0,0,0];
h(2,:) = [sqrt(3)/2, 0.5,z2];
h(3,:) = [0,1,z3];
h(4,:) = [-sqrt(3)/2,0.5,z4];
h(5,:) = [-sqrt(3)/2, -0.5,z5];
h(6,:) = [0,-1,z6];
h(7,:) = [sqrt(3)/2,-0.5,z7];
%}

h(1,:) = [0,0,0];
h(2,:) = [sqrt(3)/2, 0.5,0];
h(3,:) = [0,1,0];
h(4,:) = [-sqrt(3)/2,0.5,0];
h(5,:) = [-sqrt(3)/2, -0.5,0];
h(6,:) = [0,-1,0];
h(7,:) = [sqrt(3)/2,-0.5,0];

iterations = 5;

run('dragonslayer');
