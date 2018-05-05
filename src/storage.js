const Storage = window.localStorage;

const storage = {
  SNAKE: 'SNAKE',
  set: (key, value) => {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    return Storage.setItem(key, value);
  },
  get: (key, parse) => {
    let value = Storage.getItem(key);

    if (typeof parse === 'function') value = parse(value);

    if (typeof value !== 'string') return value;

    if (value[0] === '{' || value[0] === '[') {
      value = JSON.parse(value);
    }

    return value;
  },
  remove: (key) => {
    return Storage.removeItem(key);
  },
  clear: () => {
    return Storage.clear();
  },
  snake: {
    all: () => storage.get(storage.SNAKE) || {},
    getHighScore: () => {
      const data = storage.get(storage.SNAKE);
      if (!data) return 0;

      return data['HIGH_SCORE'] || 0;
    },
    setHighScore: (score) => storage.set(storage.SNAKE, {
      ...storage.snake.all(),
      HIGH_SCORE: score,
    }),
  },
};

export default storage;
