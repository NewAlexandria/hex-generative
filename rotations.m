clearvars;
for i = 1:100
    line(i,1) = i / 10;
    line(i,2) = i / 10;
end

t = 0.5;
theta = pi/6;
figure;

%output1 = line;

output1(1,1) = 0;
output1(1,2) = 1 / (3 ^ 0.5);
output1(2,1) = -1 / 2;
output1(2,2) = -0.5 / (3 ^ 0.5) ;
output1(3,1) = 1 / 2;
output1(3,2) = -0.5 / (3 ^ 0.5);

for j = 1:100
       hold on;
       scatter(output1(1:3,1),output1(1:3,2),'.');
    for i = 1:3

       point = rot([output1(i,1), output1(i,2)],t,theta);
       output1(i,1) = point(1);
       output1(i,2) = point(2);

    end

end
