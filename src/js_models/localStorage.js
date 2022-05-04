export const storage = {
	set: function (key, value) {
		localStorage.setItem(key, value);
	},
	remove: function (key, value) {
		localStorage.removeItem(key, value);
	},
	get: (key) => {
		localStorage.getItem(key, value);
	},
}


