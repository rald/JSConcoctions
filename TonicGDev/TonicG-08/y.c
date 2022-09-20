#include <stdio.h>
#include <string.h>

#define STRING_MAX 256

int main() {

	char line[STRING_MAX];
	int i;

	
	while(scanf("%s",line)==1) {
		printf("[");
		for(i=0;i<strlen(line);i++) {
			printf("\'%c\',",line[i]);
		}
		printf("],\n");
	}

	return 0;
}
