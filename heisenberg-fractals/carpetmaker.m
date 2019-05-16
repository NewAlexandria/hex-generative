%Sets the parameters for a Heisenberg Carpet

clearvars;
global h t theta g;

z1 = sym('z1');
z2 = sym('z2');
z3 = sym('z3');
z4 = sym('z4');
z5 = sym('z5');
z6 = sym('z6');
z7 = sym('z7');
z8 = sym('z8');


h0(1,:) = [0,0,z1];
h0(2,:) = [0,0.5,z2];
h0(3,:) = [0,1,z3];
h0(4,:) = [0.5,0,z4];
h0(5,:) = [0.5,1,z5];
h0(6,:) = [1,0,z6];
h0(7,:) = [1,0.5,z7];
h0(8,:) = [1,1,z8];

for k = 1:8
   t(k) = 1/3; 
   theta(k) = 0;
end

t = transpose(t);
theta = transpose(theta);

for (i = 1:8)
   g0(i,:) = [ (h0(i,1)*cos(theta(i)) - t(i)*h0(i,1) + h0(i,2)*sin(theta(i)))/t(i), -(t(i)*h0(i,2) - h0(i,2)*cos(theta(i)) + h0(i,1)*sin(theta(i)))/t(i), -(2*h0(i,3)*t(i)^2 + sin(theta(i))*t(i)*h0(i,1)^2 + sin(theta(i))*t(i)*h0(i,2)^2 - 2*h0(i,3))/(2*t(i)^2)]; 
end


%Connecting the outer perimiter

eqn1 = Fz(h0(8,:),1/3,0,g0(3,:)) == Fz(h0(3,:),1/3,0,g0(5,:));
eqn2 = Fz(h0(8,:),1/3,0,g0(5,:)) == Fz(h0(3,:),1/3,0,g0(8,:));
eqn3 = Fz(h0(8,:),1/3,0,g0(7,:)) == Fz(h0(6,:),1/3,0,g0(8,:));
eqn4 = Fz(h0(8,:),1/3,0,g0(6,:)) == Fz(h0(6,:),1/3,0,g0(7,:));
eqn5 = Fz(h0(6,:),1/3,0,g0(4,:)) == Fz(h0(1,:),1/3,0,g0(6,:));
eqn6 = Fz(h0(1,:),1/3,0,g0(4,:)) == Fz(h0(6,:),1/3,0,g0(1,:));
eqn7 = Fz(h0(3,:),1/3,0,g0(1,:)) == Fz(h0(1,:),1/3,0,g0(2,:));
eqn8 = Fz(h0(3,:),1/3,0,g0(2,:)) == Fz(h0(1,:),1/3,0,g0(3,:));


%Connecting the inner corners (No solutions)

%{
eqn1 = Fz(h0(1,:),1/3,0,g0(5,:)) == Fz(h0(8,:),1/3,0,g0(2,:));
eqn2 = Fz(h0(6,:),1/3,0,g0(5,:)) == Fz(h0(3,:),1/3,0,g0(7,:));
eqn3 = Fz(h0(6,:),1/3,0,g0(2,:)) == Fz(h0(3,:),1/3,0,g0(4,:));
eqn4 = Fz(h0(8,:),1/3,0,g0(4,:)) == Fz(h0(1,:),1/3,0,g0(7,:));
eqn5 = Fz(h0(6,:),1/3,0,g0(3,:)) == Fz(h0(1,:),1/3,0,g0(5,:));
eqn6 = Fz(h0(1,:),1/3,0,g0(8,:)) == Fz(h0(6,:),1/3,0,g0(5,:));
eqn7 = Fz(h0(8,:),1/3,0,g0(1,:)) == Fz(h0(6,:),1/3,0,g0(2,:));
eqn8 = Fz(h0(3,:),1/3,0,g0(6,:)) == Fz(h0(8,:),1/3,0,g0(4,:));
%}



sol = solve([eqn1,eqn2,eqn3,eqn4,eqn5,eqn6,eqn7],[z1,z2,z3,z4,z5,z6,z7,z8]);

display(sol);

z1 = sol.z1;
z2 = sol.z2;
z3 = sol.z3;
z4 = sol.z4;
z5 = sol.z5;
z6 = sol.z6;
z7 = sol.z7;
z8 = sol.z8;


h(1,:) = [0,0,z1];
h(2,:) = [0,0.5,z2];
h(3,:) = [0,1,z3];
h(4,:) = [0.5,0,z4];
h(5,:) = [0.5,1,z5];
h(6,:) = [1,0,z6];
h(7,:) = [1,0.5,z7];
h(8,:) = [1,1,z8];

iterations = 5;

display('CREATING CARPET...');
run('dragonslayer');