function output = permutemixed(xs, n)

xs = switchblock(xs,4*(n-1) +  3, 4*(n-1) + 4,1);
output = xs;

end

