function x = FF2(h)

t = 0.55610828996649009082028515324222 ^ (1/2);
theta = 0.75596941042390769450944987807704 / 2;
hx = 1;
hy = 0;
hz = 1;

gx = (hx*cos(theta) - t*hx + hy*sin(theta))/t;
gy = -(t*hy - hy*cos(theta) + hx*sin(theta))/t;
gz = -(2*hz*t^2 + sin(theta)*t*hx^2 + sin(theta)*t*hy^2 - 2*hz)/(2*t^2);
%{
gx = 0.30839062865407565321410615150964;
gy = -1.23356251461630230468119452975272;
gz = 1.6167812573081511784967319433608;
%}
x(1) = t * ((h(1) + gx) * cos(theta) - (gy + h(2)) * sin(theta));
x(2) = t * ((gy + h(2)) * cos(theta) + (gx + h(1)) * sin(theta));
x(3) = (t ^ 2) * (gz + h(3) + (1/2) * (gx * h(2) - h(1) * gy));

end

