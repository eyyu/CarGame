#include <stdio.h>

double getSlope (double x1, double y1, double x2, double y2 );
double getSlopeWithK (double k1, double k2, double x, double y);

double X_CONST = 455.0 ; 
double Y_CONST = -317.0 ;

int main (void){

	double K1, K2;
	double a1 , a2;
	
	/****************************
	 K1(x1 - x0) + K2(y1-y0) = a 
	******************************/
	/*L1_x_diff = "(x1 - x0)"*/
	/*L1_y_diff = "(y1 - y0)"*/
	
	double L1_x1 = 603.0;
	double L1_y1 = -395.0;
	double L1_x2 = 789.0;
	double L1_y2 = -626.0;

	double L2_x1 = 615.0;
	double L2_y1 = -357.0;
	double L2_x2 = 813.0;
	double L2_y2 = -532.0;
	
	double L3[] = {583.0, -383.0, 754.0, -607.0};
	double L1_x_diff = L1_x1 - X_CONST; /* corresponds w/ a1*/
	double L1_y_diff = L1_y1 - Y_CONST; /* corresponds w/ a1*/
	/*L2_x_diff = "(x1 - x0)"*/
	/*L2_y_diff = "(y1 - y0)"*/
	double L2_x_diff = L2_x1 - X_CONST; /* corresponds w/ a2*/
	double L2_y_diff = L2_y1 - Y_CONST; /* corresponds w/ a2*/

	a1 = getSlope(L1_x1 , L1_y1, L1_x2, L1_y2);
	a2 = getSlope(L2_x1 , L2_y1, L2_x2, L2_y2);
	/* NOTE: -L2_x_diff * L1_x_diff) / L2_x_diff; /* redundant step */
	K2 = ( (a1 * -L2_x_diff / L1_x_diff) + a2) / ( (L1_y_diff * -L2_x_diff / L1_x_diff) + L2_y_diff );
	K1 = (a1 - (K2 * L1_y_diff)) / L1_x_diff; 

	printf("X_CONST is: %0.2f\n", X_CONST );
	printf("Y_CONST is: %0.2f\n\n", Y_CONST );
	printf("LINE 1 is: (%0.2f ,%0.2f ) , (%0.2f ,%0.2f) \n", L1_x1 , L1_y1, L1_x2, L1_y2 );
	printf("\tLINE 1 has a slope of: %0.5f \n\n", a1 );
	printf("LINE 2 is: (%0.2f ,%0.2f ) , (%0.2f ,%0.2f) \n", L2_x1 , L2_y1, L2_x2, L2_y2 );
	printf("\tLINE 2 has a slope of: %0.5f \n\n", a2);
	printf("K1 is: %0.7f\n", K1 );
	printf("K2 is: %0.5f\n", K2 );
	printf("\n\n*****************************\n\tCHECK\n*****************************\n", K2 );
	printf("CHECK LINE 1 slope given K1 and K2: %0.5f \n", getSlopeWithK(K1, K2, L1_x1, L1_y1) );
	printf("CHECK LINE 2 slope  given K1 and K2: %0.5f \n", getSlopeWithK(K1, K2, L2_x1, L2_y1) );
	printf("LINE 3 is: (%0.2f ,%0.2f ) , (%0.2f ,%0.2f) \n", L3[0] , L3[1], L3[2], L3[3] );
	printf("CHECK NEW LINE 3 slope  given two points: %0.5f \n", getSlope(L3[0], L3[1], L3[2], L3[3]) );
	printf("CHECK NEW LINE 3 slope  given K1 and K2: %0.5f \n", getSlopeWithK(K1, K2, L3[0], L3[1]) );
} /*end of Main*/

double getSlope (double x1, double y1, double x2, double y2 ){
	return ( (y2 - y1) / (x2 - x1) );
}

double getSlopeWithK (double k1, double k2, double x, double y){
	return (k1 * ( x - X_CONST ) ) + ( k2 * ( y - Y_CONST ) );
}