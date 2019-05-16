function output = permute2(xs, b , n)
%b stands for block size
xs = switchblock(xs,8*(n-1) +  2, 8*(n-1) + 3,b);
%xs = switchblock(xs,4,5,b);
xs = switchblock(xs,8 * (n-1) + 6,  8*(n-1) + 7,b);
output = xs;




end

