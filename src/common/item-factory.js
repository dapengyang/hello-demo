let lastIndex = 0;
var colors = [
    'rgba(21,174,103,.5)',
    'rgba(245,163,59,.5)',
    'rgba(255,230,135,.5)',
    'rgba(194,217,78,.5)',
    'rgba(195,123,177,.5)',
    'rgba(125,205,244,.5)'
]
var ItemFactory = {
    get: function (count) {
        var items = [],
            i
        for (i = 0; i < count; i++) {
            items[i] = {
                index: lastIndex++,
                style: {
                    background: colors[~~(Math.random() * colors.length)]
                },
                width: 100 + ~~(Math.random() * 50),
                height: 100 + ~~(Math.random() * 50)
            }
        }
        return items
    }
}

export default ItemFactory;