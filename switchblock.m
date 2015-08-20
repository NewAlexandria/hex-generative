function output = switchblock(xs, n1, n2, b )
%b stands for block size

for i = 1:b
   %swap rows n1*b + i and n2*b + i
   temp = xs((n1 - 1) * b + i,:);
   xs(( n1 - 1)* b + i,:) = xs((n2 - 1) * b + i,:);
   xs((n2 - 1) * b + i,:) = temp;
end

output = xs;


end

