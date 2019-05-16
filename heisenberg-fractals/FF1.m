function x = FF1(h)

t = (0.5 ^ 0.5) ^ (1/2);
theta = -0.56984825324412477054978933235144 / 2;
hx = 0;
hy = 0;
hz = 0;

gx = (hx*cos(theta) - t*hx + hy*sin(theta))/t;
gy = -(t*hy - hy*cos(theta) + hx*sin(theta))/t;
gz = -(2*hz*t^2 + sin(theta)*t*hx^2 + sin(theta)*t*hy^2 - 2*hz)/(2*t^2);

x(1) = t * ((h(1) + gx) * cos(theta) - (gy + h(2)) * sin(theta));
x(2) = t * ((gy + h(2)) * cos(theta) + (gx + h(1)) * sin(theta));
x(3) = (t ^ 2) * (gz + h(3) + (1/2) * (gx * h(2) - h(1) * gy));

end