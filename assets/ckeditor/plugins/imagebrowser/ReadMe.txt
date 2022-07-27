================================================================================
*Plugin imagebrowser ckeditor.
*Inherited and developed by: Quoc Nguyen Bao, Thank you to the author: Slavi Pantaleev (Copyright (c) 2013)

Contact Info====================================================================
- Full Name: Quoc Nguyen Bao
- Email: quocbao.thietke.laptrinhweb@gmail.com
- Facebook: https://www.facebook.com/devilcry1989
- Phone, Zalo: +84 937 587 087
- Skype: quocbao_design
================================================================================

Donations (Visa master)=========================================================
- Sacombank: https://www.sacombank.com.vn
- Bank account holder: NGUYEN BAO QUOC
- Bank account number: 060132908268
================================================================================

Install=========================================================================

- 1/Dowload plugin:
+ https://ckeditor.com/download
+ link plugins at comment youtube
+ Add javascript:
<script type="text/javascript">
  CKEDITOR.replace('description', {
    "extraPlugins" : 'imagebrowser',
		"imageBrowser_listUrl" : "/files"
  });
</script>

- 2/ Add module

var bodyParser = require('body-parser');
var multer  =   require('multer');
var fs = require('fs')
var path = require('path')
var crypto = require('crypto');

- 3/ Add config multer

var storage = multer.diskStorage({
  destination: 'public/upload/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, Math.floor(Math.random()*9000000000) + 1000000000 + path.extname(file.originalname))
    })
  }
})
var upload = multer({ storage: storage });

- 4/ use module

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

//show ckeditor to home
app.get('/', function (req, res) {
  var title = "Plugin Imagebrowser ckeditor for nodejs"
  res.render('index', { result: 'result' })
})

- 5/Add control controller: (files, upload, delete_file)

  app.get('/files', function (req, res) {
    const images = fs.readdirSync('public/upload')
    var sorted = []
    for (let item of images){
        if(item.split('.').pop() === 'png'
        || item.split('.').pop() === 'jpg'
        || item.split('.').pop() === 'jpeg'
        || item.split('.').pop() === 'svg'){
            var abc = {
                  "image" : "/upload/"+item,
                  "folder" : '/'
            }
            sorted.push(abc)
        }
    }
    res.send(sorted);
  })

  app.post('/upload', upload.array('flFileUpload', 12), function (req, res, next) {
      res.redirect('back')
  });

  app.post('/delete_file', function(req, res, next){
  	var url_del = 'public' + req.body.url_del
    console.log(url_del)
  	if(fs.existsSync(url_del)){
  		fs.unlinkSync(url_del)
  	}
  	res.redirect('back')
  });

- 6/Run and view results
================================================================================
