# Thoughts on Code

#### Setup
```
git clone git@github.com:kvendrik/thoughts-on-code.git
cd thoughts-on-code
sudo npm i
```

#### Writing
Put your markdown files in `docs/` prefixed by the chapter number.
```
docs/
    1_chapter 1.md
    1_chapter 2.md
```

Then compile it using `make`.

#### Development
If you'd like to alter the styling or scripts of the page you can use `gulp` to set up a local web server. It will also watch and compile your sass and js files.
