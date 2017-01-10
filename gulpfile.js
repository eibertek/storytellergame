	// Gulp
	var gulp = require('gulp');
	var exec = require('child_process').exec;

	// Sass/CSS stuff
	var sass = require('gulp-sass');
	var prefix = require('gulp-autoprefixer');
	//var minifycss = require('gulp-minify-css');
    var cleanCSS = require('gulp-clean-css');
	// JavaScript
	var uglify = require('gulp-uglify');

	// Images
	var svgmin = require('gulp-svgmin');
	var imagemin = require('gulp-imagemin');

	// Stats and Things
	var size = require('gulp-size');
	var ts = require('gulp-typescript');
	// -- Gulp Tasks --------------------------------------
	gulp.task('backend', function () {
		console.log('Exportando Typescript');
		return gulp.src('src/backend/**/*.ts')
			.pipe(ts({
			noImplicitAny: false
		}))
			.pipe(gulp.dest('built/local'));
	});

	gulp.task('frontend', function () {
		console.log('Exportando Typescript 2');
		return gulp.src('src/frontend/lib/Game/**/*.ts')
			.pipe(ts({
			noImplicitAny: false
		}))
			.pipe(gulp.dest('./client/lib/Game/'));
	});
	
	gulp.task('copy', function () {
		gulp.src('./src/frontend/**/*.html')
			.pipe(gulp.dest('./client'));
		gulp.src('./src/frontend/lib/**/**/*.js')
			.pipe(gulp.dest('./client/lib'));
		gulp.src('./src/frontend/assets/**/*')
			.pipe(gulp.dest('./client/assets'));
		return true;		
	});

	// compile all your Sass
		gulp.task('sass', function (){
			console.log('Compilando sass');
			gulp.src(['./src/frontend/sass/*.scss', '!./fesrc/sass/_variables.scss'])
				.pipe(sass({
					includePaths: ['./fesrc/sass'],
					outputStyle: 'expanded'
				}))
				.pipe(prefix(
					"last 1 version", "> 1%", "ie 8", "ie 7"
					))
				.pipe(gulp.dest('./src/frontend/assets/css'))
				.pipe(cleanCSS({compatibility: 'ie8'}))
				.pipe(gulp.dest('./client/assets/css'));
		});

	// Uglify JS
		gulp.task('uglify', function(){
		    console.log('corriendo minify');			
			gulp.src('./src/frontend/lib/**/*.js')
				.pipe(uglify())
				.pipe(gulp.dest('./client/lib/'));
		});

	// Images
		gulp.task('svgmin', function() {
		    console.log('corriendo svgmin');			
			gulp.src('./src/frontend/assets/img/svg/*.svg')
			.pipe(svgmin())
			.pipe(gulp.dest('./src/frontend/assets/img/svg'))
			.pipe(gulp.dest('./client/assets/img/svg'));
		});

		gulp.task('imagemin', function () {
		    console.log('corriendo imagemin');			
			gulp.src('./src/frontend/assets/img/**/*')
			.pipe(imagemin())
			.pipe(gulp.dest('./src/frontend/assets/img'))
			.pipe(gulp.dest('./client/assets/img'));
		});

	// Stats and Things
		gulp.task('stats', function () {
			gulp.src('./client/**/*')
			.pipe(size())
			.pipe(gulp.dest('./client'));
		});
	// Stats and Things
		gulp.task('info', function () {
			console.log('**************************************');
			console.log('********   README       **************');
			console.log('***************************************');
			console.log('gulp backend: compila la parte de node.js');
			console.log('gulp uglify: minimiza los js');
			console.log('gulp sass: genera los css (requiere gems sass)');
			console.log('gulp copy: copia los html');
			console.log('gulp: hace un watch de js + html + sass');
			console.log('gulp run: corre el servidor en puerto 3000');
			console.log('gulp runmock: corre el servidor con un mock de la base de datos en puerto 3000');
			console.log('                                       ');
			console.log('***************************************');
			console.log('                                       ');
			console.log('atentamente, Mariano Eiberman');
			console.log('                                       ');
			console.log('                                       ');
		});
		
		gulp.task('run', function (cb) {
			exec('node built/local/www.js', function (err, stdout, stderr) {
				console.log(stdout);
				console.log(stderr);
				cb(err);
			});
		});

		gulp.task('runmock', function (cb) {
			exec('node ./built/local/www.js mock', function (err, stdout, stderr) {
				console.log(stdout);
				console.log(stderr);
				cb(err);
			});
		});		
	// run all tasks
	gulp.task('build', function(){
			console.log('compilando Node...');
			gulp.run('backend');
			console.log('copiando archivos cliente...');
			gulp.run('copy');
			console.log('compilando sass...');
			gulp.run('sass');
			console.log('afeando js...');
			gulp.run('uglify');
			console.log('minificando imagenes...');
			gulp.run('imagemin');
			gulp.run('svgmin');
			return true;
	});

	gulp.task('ci', function(){
		// make my JavaScript ugly
		gulp.watch("./src/frontend/lib/**/**/*.js", function(event){
			console.log('running uglify');
			gulp.run('copy');
		});
	});
	gulp.task('default', function(){

		// watch me getting Sassy
		gulp.watch("./src/frontend/**/*.html", function(event){
			console.log('running copy');
			gulp.run('copy');
		});
		// watch me getting Sassy
		gulp.watch("./src/frontend/sass/**/*.scss", function(event){
			console.log('running sass');
			gulp.run('sass');
		});
		// make my JavaScript ugly
		gulp.watch("./src/frontend/lib/**/**/*.js", function(event){
			console.log('running uglify');
			gulp.run('copy');
		});
		gulp.watch("./src/frontend/lib/**/**/*.ts", function(event){
			console.log('running uglify');
		//	gulp.run('frontend');
		});

	});