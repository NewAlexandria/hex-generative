%This script is a generalization of the fractal script. This script
%generates the fractal for an IFS with arbitrarily many functions.

clear output;
%global h t theta g;

start = h;
[numpoints,n] = size(h);
key = (0:numpoints^(iterations - 1));
key = dec2base(key,numpoints);

[m,n] = size(key);
percent = 10;

for (i = 1:numpoints)
   g(i,:) = [ (h(i,1)*cos(theta(i)) - t(i)*h(i,1) + h(i,2)*sin(theta(i)))/t(i), -(t(i)*h(i,2) - h(i,2)*cos(theta(i)) + h(i,1)*sin(theta(i)))/t(i), -(2*h(i,3)*t(i)^2 + sin(theta(i))*t(i)*h(i,1)^2 + sin(theta(i))*t(i)*h(i,2)^2 - 2*h(i,3))/(2*t(i)^2)]; 
end

for (i = 1:m)
    h = start;
    
    for (j = 1:n)
        for (k = 1:numpoints)
            h(k,:) = F1(h(k,:),t(key(i,j) - 47),theta(key(i,j) - 47),g(key(i,j) - 47,:));     
        end
       
        
        
        
    end
    
    for(k = 1:numpoints)
        output(numpoints*i - (numpoints - k),:) = h(k,:);
      
    end
   
     if mod(i, floor(m / 10)) == 0
          display(strcat('CONGRATULATIONS! WE BREACHED THE PERCENTAGE OF: ', num2str(percent)));
          percent = percent + 10;
     end
    
    
end



[m,n] = size(output);

figure
plot3(output(1:m,1),output(1:m,2),output(1:m,3),'.')
h = start;