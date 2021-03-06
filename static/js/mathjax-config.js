MathJax = {
	options: {
		skipHtmlTags: { '[-]': ['code'] },
	},
	tex: {
		inlineMath: { '[+]': [['$', '$']] },
	},
	startup: {
		pageReady: function() {
			let codes = document.getElementsByTagName('code');
			let mathCodes = [];

			for (let i = 0; i < codes.length; i++) {
				let code = codes[i];

				if (code.parentNode.tagName !== 'PRE' && code.childElementCount === 0) {
					let text = code.textContent.trim();

					let inputs = MathJax.startup.getInputJax();

					for (let j = 0; j < inputs.length; j++) {
						if (inputs[j].processStrings) {
							let matches = inputs[j].findMath([text]);
							if (matches.length === 1 && matches[0].start.n === 0 && matches[0].end.n === text.length) {
								code.classList.add("inline-latex");
								mathCodes.push(code);
								break;
							}
						}
					}
				}
			}

			MathJax.typesetPromise([mathCodes]);
		}
	},
};
