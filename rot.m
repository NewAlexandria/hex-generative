function x = rot(in,t,theta)
h = [0,0];

gx = (h(1)*cos(theta) - t*h(1) + h(2)*sin(theta))/t;
gy = -(t*h(2) - h(2) * cos(theta) + h(1) * sin(theta))/t;

x(1) = t * ((0 + in(1)) * cos(theta) - (0 + in(2))* sin(theta));
x(2) = t * ((0 + in(2)) * cos(theta) + (0 + in(1))* sin(theta));


end

