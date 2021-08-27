function cardVideoHandler() {
	function togglePlayPause(video,btn) {
		if(video.paused) {
			video.play();
			btn.firstElementChild.className = 'icon-pause2';

		} else {
			video.pause();
			btn.firstElementChild.className = 'icon-play3';
		}
	}

	let videoBlock = document.querySelectorAll('.video-block');
	if(videoBlock.length) {
		let timerId;
		videoBlock.forEach((item) => {

			//let videoWrap = card.querySelector('.card-video__video-wrap');
			let video = item.querySelector('.video-block__video');
			let btn = item.querySelector('.video-block__play-pause');
			//let time = item.querySelector('.card-video__duration-time');
			//let btnLink = item.querySelector('.card-video__btn');

			if(video) {
				btn.addEventListener('click', (e) => {
					e.preventDefault();
					togglePlayPause(video,btn);
				});
				video.addEventListener('ended', () => {
					video.pause();
					btn.firstElementChild.className = 'icon-play3';
				});
				video.addEventListener('mousemove', (e) => { 
					if(!video.paused) {
						btn.style.opacity = '1';
						
							clearTimeout(timerId);
							timerId = setTimeout(() => {
								btn.style.opacity = '0';
							}, 2000);

					} else {
						btn.style.opacity = '1';
					}

				});

			}
		})
	}

}

cardVideoHandler();