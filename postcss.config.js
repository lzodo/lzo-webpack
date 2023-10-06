module.exports = {
  plugins: [require("autoprefixer")], // 可以用 postcss-preset-env（转换范围广，不仅仅前缀） 代替 autoprefixer
};

// postcss
// module.exports = {
//     plugins:[
//         require("autoprefixer")({browsers:[
//             'last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie> 8'
//         ]})
//     ]
// }
