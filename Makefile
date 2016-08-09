.IGNORE:

SHELL = /bin/bash

prefix = /usr/local
bindir = $(prefix)/bin

LIBS       = 
LDFLAGS    =  -L. -L/usr/local/lib 

CC       = /usr/bin/gcc
CFLAGS     = -ansi -c
CPPFLAGS = -I. -I/usr/local/include

CC_COMP  = $(CC) $(CFLAGS) $(CPPFLAGS)
CC_LOAD  = $(CC) $(LDFLAGS)

EXECUTABLES = Main

all: $(EXECUTABLES)

install: all
	if test ! -d $(prefix); then\
		mkdir $(prefix);\
	fi
	if test ! -d $(bindir); then\
		mkdir $(bindir);\
	fi
	cp $(EXECUTABLES) $(bindir)

.c.o:
	$(CC_COMP) $*.c

OBJECTS = Main.o  
Main: $(OBJECTS)
	$(CC_LOAD) $(OBJECTS) $(LIBS) -o Main

softCopy:
	./$(EXECUTABLES) < input.txt > Test\ Output.txt

########################################################################
# Clean-up
########################################################################

clean:
	/bin/rm $(EXECUTABLES)
	/bin/rm *.o

cleanObject:
	/bin/rm *.o