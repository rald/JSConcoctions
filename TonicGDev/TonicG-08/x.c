#include <stdio.h>
#include <stdbool.h>

#define STRING_MAX 256

int main() {

	char line[STRING_MAX];
	bool first=true;

	while(scanf("%s",line)==1) {
		if(first) {
			first=false;
		} else {
			printf(", \n");
		}
		printf("\"%s\"",line);
	}

	return 0;
}
