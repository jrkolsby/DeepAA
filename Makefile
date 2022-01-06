SLIDES=9
WIDTH=300
FRAMES=./frames
OUTPUT=./output

.PHONY : all
all: clean animate

.PHONY : clean
clean: 
	rm -rf $(OUTPUT)/*

.PHONY : frames
frames : 
	ffmpeg -i ./input.gif -vsync 0 $(FRAMES)/%3d.png

.PHONY : render
render: 
	@for f in $(FRAMES)/* ; do \
		BASENAME=$$(basename $$f); \
		python output.py $$f "$(OUTPUT)/$$BASENAME" $(SLIDES) $(WIDTH); \
    	done

.PHONY : animate
animate: render
	for (( c=0; c<=$(SLIDES); c++ )); do \
		SLIDEDIR="$(OUTPUT)/slide_$$c"; \
		mkdir $$SLIDEDIR; \
		cp $(OUTPUT)/**/*_slide$$c.png $$SLIDEDIR; \
		ffmpeg -f image2 -framerate 12 -i $$SLIDEDIR/%03d_w$(WIDTH)_slide$$c.png -loop -1 "$(OUTPUT)/out_slide_$$c.gif"; \
	done

