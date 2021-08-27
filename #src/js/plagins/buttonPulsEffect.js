	// == puls effect ==========================================
	{
		let puls = document.querySelectorAll('._puls');
		if(puls.length>0) {
			puls.forEach(el => {
				el.style.position = 'relative';
				el.style.overflow = 'hidden';

				el.addEventListener('click', function(e) {
					let elWidth = this.clientWidth;
					let elHeight = this.clientHeight;
					let circleSize = Math.max(elWidth, elHeight);
					let rect = this.getBoundingClientRect();

					
					let pulsDecor = document.createElement('div');
					pulsDecor.classList.add('_puls-decor');
					pulsDecor.style.width = circleSize + 'px';
					pulsDecor.style.height = circleSize + 'px';
					pulsDecor.style.position = 'absolute';
					pulsDecor.style.left = (e.clientX - rect.left) - (circleSize / 2) + 'px';
					pulsDecor.style.top = (e.clientY - rect.top) - (circleSize / 2) + 'px';
					pulsDecor.style.zIndex = 5;

					this.append(pulsDecor);

					setTimeout(() => {
						pulsDecor.remove();
					},800)
					
				})
			})
		}
	}
	// == // puls effect ==========================================