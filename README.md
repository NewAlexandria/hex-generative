# Heisenberg-Fractals
A collection of fractal generators in Matlab


This code was written for the 2015 Cornell University Summer Program For Undergraduate Research (SPUR) Project 1: Analysis on Fractals.  The author was [Max Lipton](https://www.linkedin.com/pub/max-lipton/102/695/948).

    Excuse some of the messiness of the code. It was written for exploratory use first, with user-friendliness second.

## Generating Fractals

The scripts "mixed," "snowflake," "carpetmaker," and "generate" will create fractals. 

### Using your own iterator

Alternatively, you can specify your own Iterated Function System (IFS) by creating an array of fixed points in three-dimensional space, named "h", along with an array of contraction ratios and rotation angles, named "t" and "theta," and finally specifying the number of iterations in a variable named "iterations." Be sure that the number of fixed points, ratios, and angles coincide. Finally, you can generate this image by running the script "dragonslayer."

Note that since the number of points in a fractal grows exponentially with each iteration, the code will run slowly if you have a high number of iterations (>10) or a high number of functions in your IFS.
