%This script generates an the fractal of an IFS with two functions

global h1 h2 h3 t1 t2 t3 theta1 theta2 theta3 g1 g2 g3 mixed1 sierpinsky;

clear output;

if sierpinsky == 0
nums = (0:(2^iterations) - 1);
key = de2bi(nums);
%key = load('coordinates.txt');
[m,n] = size(key);

%if touching == 2
   % key = permute2(key,m / 8);
%end
else
    
    nums = (0:(3^iterations - 1));
    key = dec2base(nums,3);
    [m,n] = size(key);
    t3 = double(t3);
    theta3 = double(theta3);
    g3 = [ (h3(1)*cos(theta3) - t3*h3(1) + h3(2)*sin(theta3))/t3, -(t3*h3(2) - h3(2)*cos(theta3) + h3(1)*sin(theta3))/t3, -(2*h3(3)*t3^2 + sin(theta3)*t3*h3(1)^2 + sin(theta3)*t3*h3(2)^2 - 2*h3(3))/(2*t3^2)];
    start3 = h3;


end

%{
t1 = round(t1 *   10^2) / (10 ^ 2);
t2 = round(t2 *   10^2) / (10 ^ 2);
theta1 = round(theta1 *   10^2) / (10 ^ 2);
theta2 = round(theta2 *   10^2) / (10 ^ 2);
g1 = round(g1 *  10^2) / (10 ^ 2);
g2 = round(g2 *  10^2) / (10 ^ 2theta
%}


t1 = double(t1);
t2 = double(t2);
theta1 = double(theta1);
theta2 = double(theta2);

g1 = [ (h1(1)*cos(theta1) - t1*h1(1) + h1(2)*sin(theta1))/t1, -(t1*h1(2) - h1(2)*cos(theta1) + h1(1)*sin(theta1))/t1, -(2*h1(3)*t1^2 + sin(theta1)*t1*h1(1)^2 + sin(theta1)*t1*h1(2)^2 - 2*h1(3))/(2*t1^2)];
g2 = [ (h2(1)*cos(theta2) - t2*h2(1) + h2(2)*sin(theta2))/t2, -(t2*h2(2) - h2(2)*cos(theta2) + h2(1)*sin(theta2))/t2, -(2*h2(3)*t2^2 + sin(theta2)*t2*h2(1)^2 + sin(theta2)*t2*h2(2)^2 - 2*h2(3))/(2*t2^2)];


start1 = h1;
start2 = h2;
percent = 10;

%output = zeros(2*m,3);
if sierpinsky == 0
    for i = 1:m
        h1 = start1;
        h2 = start2;
        address1(1) = 0;
        address2(1) = 1;
        address1(2:n+1) = key(i,1:n);
        address2(2:n+1) = key(i,1:n);

       for j = 1:n
           if key(i,j) == 0
               h1 = F1(h1,t1,theta1,g1);
               h2 = F1(h2,t1,theta1,g1);
           elseif key(i,j) == 1 
               h1 = F2(h1,t2,theta2,g2);
               h2 = F2(h2,t2,theta2,g2);
           end


       end

       output(2*i - 1,1) = h1(1);
       output(2*i - 1,2) = h1(2);
       output(2*i - 1,3) = h1(3);
       output(2*i,1) = h2(1);
       output(2*i,2) = h2(2);
       output(2*i,3) = h2(3);

       output(2*i - 1, 4:n+4) = address1(1:n+1);
       output(2*i, 4:n+4) = address2(1:n+1);
       [rows, columns] = size(output);



       if mod(i, floor(m / 10)) == 0
          display(strcat('CONGRATULATIONS! WE BREACHED THE PERCENTAGE OF: ', num2str(percent)));
          percent = percent + 10;
       end

    end
else

        [m,n] = size(key);
        for i = 1:m
        h1 = start1;
        h2 = start2;
        h3 = start3;
        
        address1(1) = 0;
        address2(1) = 1;
        address3(1) = 2;
        address1(2:n+1) = key(i,1:n);
        address2(2:n+1) = key(i,1:n);
        address3(2:n+1) = key(i,1:n);


       for j = 1:n
           if key(i,j)-48 == 0
               h1 = F1(h1,t1,theta1,g1);
               h2 = F1(h2,t1,theta1,g1);
               h3 = F1(h3,t1,theta1,g1);
           elseif key(i,j)-48 == 1 
               h1 = F2(h1,t2,theta2,g2);
               h2 = F2(h2,t2,theta2,g2);
               h3 = F2(h3,t2,theta2,g2);
           elseif key(i,j)-48 == 2
               h1 = F3(h1,t3,theta3,g3);
               h2 = F3(h2,t3,theta3,g3);
               h3 = F3(h3,t3,theta3,g3);
           end


       end

       output(3*i - 2,1) = h1(1);
       output(3*i - 2,2) = h1(2);
       output(3*i - 2,3) = h1(3);
       output(3*i - 1,1) = h2(1);
       output(3*i - 1,2) = h2(2);
       output(3*i - 1,3) = h2(3);
       output(3*i,1) = h3(1);
       output(3*i,2) = h3(2);
       output(3*i,3) = h3(3);
       
       %output(3*i - 2, 4:n+4) = address1(1:n+1);
       %output(3*i - 1, 4:n+4) = address2(1:n+1);
       %output(3*i,4:n+4) = address3(1:n+1);

       [rows, columns] = size(output);



       if mod(i, floor(m / 10)) == 0
          display(strcat('CONGRATULATIONS! WE BREACHED THE PERCENTAGE OF: ', num2str(percent)));
          percent = percent + 10;
       end

    end

    
    
    
end


[rows, columns] = size(output);

if sierpinsky == 0
newoutput = [NaN, NaN, NaN];
    

   if touching == 2
          for i = 1:rows / 8
             output = permute2(output,1,i);
           
          end
   
   for k = 1 : rows/4
       clear temp;
       temp(1, 1:3) = output(4 * (k -1) + 1,1:3);
       temp(2, 1:3) = output(4 * (k -1) + 2,1:3);
       temp(3, 1:3) = output(4 * (k -1) + 3,1:3);
       temp(4, 1:3) = output(4 * (k -1) + 4,1:3);
       %if mod(k,2) == 1
           temp(5, 1:3) = [NaN, NaN, NaN];
       %end
       newoutput = [newoutput; temp];
       
   end
   output = newoutput;
end

end
if mixed1 == true & sierpinsky == 0
    for k = 1 : rows/4
       output = switchblock(output,4*(k-1) +  3, 4*(k-1) + 4,1);
       %display('MIXING IT UP...');
        
  
       clear temp;
       temp(1, 1:3) = output(4 * (k -1) + 1,1:3);
       temp(2, 1:3) = output(4 * (k -1) + 2,1:3);
       temp(3, 1:3) = output(4 * (k -1) + 3,1:3);
       temp(4, 1:3) = output(4 * (k -1) + 4,1:3);
       temp(5, 1:3) = output(4 * (k -1) + 1,1:3);
       temp(6, 1:3) = [NaN, NaN, NaN];
       
       newoutput = [newoutput; temp];
   end
   
   output = newoutput;
    
end

h1 = start1;
h2 = start2;

[m,n] = size(output);
%figure;
plot3(output(1:m,1),output(1:m,2),output(1:m,3),'.-');


