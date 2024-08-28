gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.config({
    nullTargetWarn: false,
    trialWarn: false
});
/*----  Functions  ----*/
function interior_img_animation() {
    const boxes = gsap.utils.toArray('.interior-animation-style1,.interior-animation-style2,.interior-animation-style3,.interior-animation-style4,.interior-animation-style5,.interior-animation-style6,.interior-animation-style7');
    boxes.forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: "top 70%",
                end: "bottom bottom",
                toggleClass: "active",
                once: true,
            }
        });
    });
}

function getpercentage(x, y, elm) { 
    elm.find('.interior-fid-inner').html(y + '/' + x);
    var cal = Math.round((y * 100) / x);
    return cal;
}

function interior_title_animation() {

	ScrollTrigger.matchMedia({
		"(min-width: 1025px)": function() {

		var interior_var = jQuery('.interior-heading, .interior-heading-subheading');
		if (!interior_var.length) {
			return;
		}
		const quotes = document.querySelectorAll(".interior-heading-subheading .interior-title, .interior-heading .interior-title");

			quotes.forEach(quote => {

				//Reset if needed
				if (quote.animation) {
					quote.animation.progress(1).kill();
					quote.split.revert();
				}

				var getclass = quote.closest('.interior-heading-subheading, .interior-heading').className;
				var animation = getclass.split('animation-');
				if (animation[1] == "style4") return

				quote.split = new SplitText(quote, {
					type: "lines,words,chars",
					linesClass: "split-line"
				});
				gsap.set(quote, { perspective: 400 });

				if (animation[1] == "style1") {
					gsap.set(quote.split.chars, {
						opacity: 0,
						y: "90%",
						rotateX: "-40deg"
					});
				}
				if (animation[1] == "style2") {
					gsap.set(quote.split.chars, {
						opacity: 0,
						x: "50"
					});
				}
				if (animation[1] == "style3") {
					gsap.set(quote.split.chars, {
						opacity: 0,
					});
				}
				quote.animation = gsap.to(quote.split.chars, {
					scrollTrigger: {
						trigger: quote,
						start: "top 90%",
					},
					x: "0",
					y: "0",
					rotateX: "0",
					opacity: 1,
					duration: 1,
					ease: Back.easeOut,
					stagger: .02
				});
			});
		},
	});
}

function interior_extend_section() {
	const interior_elm = gsap.utils.toArray('.interior-extend-animation');
	if (interior_elm.length == 0) return	
	ScrollTrigger.matchMedia({
		"(min-width: 1200px)": function() {
			 
			interior_elm.forEach(section => {
				let tl = gsap.timeline({
					scrollTrigger: {
						trigger: section,
						start: "top 50%",
						end: "+=400px",
						scrub: 1
					},
					defaults: { ease: "none" }
				});
				tl.fromTo(section, { clipPath: 'inset(0% 5% 0% 5% round 30px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.5 })	
			});			 
		}
	});
}

function interior_animate_custom_text() {
	jQuery("#js-rotating").Morphext({
		animation: "flipInX",
		speed: 3000,
	});
}

function interior_ihbox_move() {

	var interior_var = jQuery('.interior-move-sofa');
	if (!interior_var.length) {
		return;
	}
	ScrollTrigger.matchMedia({
		"(min-width: 1200px)": function() {

			gsap.set(".interior-move-sofa", { yPercent:20, })

			gsap.to(".interior-move-sofa", {		
				yPercent: -50,
				scrollTrigger: {
					scrub: true,
					start: () => "top top", 
					end:() =>  "bottom top",
					scrub:2
				}
			});
		},
		"(max-width:1200px)": function() {
			ScrollTrigger.getAll().forEach(scrub => scrub.kill(true));
		}
	});
}

function interior_sticky() {

	ScrollTrigger.matchMedia({
		"(min-width: 1200px)": function() {
			let interior_sticky_container = jQuery(".interior-sticky-col");
			let section = interior_sticky_container.closest('section');
			if (!section[0]) {
				section = interior_sticky_container.closest('.interior-sticky-section');
			} 
			let tl = gsap.timeline({
				scrollTrigger: {
					pin: interior_sticky_container,
					scrub: 1,
					start: "top top", 
					trigger: section,
					end: () => "+=" + ((section.height() + 150) - window.innerHeight), 
					invalidateOnRefresh: true
				},
				defaults: { ease: "none", duration: 1 }
			});
		},
	}); 
}

function interior_set_tooltip() {
    $('[data-cursor-tooltip]').each(function() {
        var thisele = $(this);
        var thisele_html = thisele.find('.pbminfotech-box-content').html();
        thisele.attr("data-cursor-tooltip", thisele_html);
    });
}

ScrollTrigger.matchMedia({
    "(max-width: 1200px)": function() {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
});

// on ready
jQuery(document).ready(function() {
	interior_title_animation();
	interior_ihbox_move();
});

// on resize
jQuery(window).resize(function() {
	interior_title_animation();
	interior_img_animation();
});

// on load
jQuery(window).on('load', function(){
    interior_extend_section();
	interior_img_animation();
	interior_sticky();
	interior_animate_custom_text();
	
	jQuery('[data-magnetic]').each(function() { new Magnetic(this); });
	gsap.delayedCall(1, () =>
		ScrollTrigger.getAll().forEach((t) => {
			t.refresh();
		})
	);	
	
	setTimeout(cleaning, 500);
	function cleaning(){
		ScrollTrigger.refresh(); 
	}
});