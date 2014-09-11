
var previewContainer = $('table[dsid=image_UserDetail_Photo]');
                    var fileName = $('[name=browsePhoto]');
          var appName = 'AO Dev';
                    // make the preview container visible once a file was selected
                    //previewContainer.toggle();
                    var files = event.target.files || event.dataTransfer.files;
                    file = files[0];
                    console.log(file.slice);
          var isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;
                    
                    if (file.slice || file.webkitSlice) {
                        var blob = file.slice ? file.slice(0, 4) : file.webkitSlice(0, 4);
                          //console.log('webkit slice');
                      } else if (file.mozSlice) {
                            //console.log('moz slice');
                        var blob = file.mozSlice(0, 4);
                      } else {
                        //navigator.notification.alert('can\'t slice file');
                            MessageDialog(appName, 'can\'t slice file');
                      }
                    
                    
                    //var slice1 = file.slice(0, 4);
                    // set the file name
                    //fileName.text(file.name);
                    
                    //console.log(file.type);
                    
                    // display image in preview container
                    //if (file.type.indexOf("image") == 0) {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                          //validating file we are going to upload by it's first 4 bytes to avoid tricks with file exta
                          
                          var buffer = reader.result;
                        
                        
                          var int32View = new Int32Array(buffer);
                          console.log(int32View[0]);
                          switch(int32View[0]) {
                                case 1196314761: 
                                    file.verified_type = "image/png";
                                    break;
                                case 944130375:
                                    file.verified_type = "image/gif";
                                    break;
                                case 544099650:
                                    file.verified_type = "image/bmp";
                                    break;
                                case -520103681:
                                    file.verified_type = "image/jpeg";
                                    break;
                                case -503326465:
                                  file.verified_type = "image/jpeg";
                                  break;
                                default:
                                  file.verified_type = "unknown";
                                break;
                            }
                          //console.log(file.verified_type);
                          //---
                          
                          if (file.verified_type !== 'unknown') { 
                            
                            var imgReader = new FileReader();
                            imgReader.onload = function(e)
                            { 
                                //--
                              buffer = imgReader.result;
                                var base64 = '',
                                    encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                                    bytes = new Uint8Array(buffer), byteLength = bytes.byteLength,
                                    byteRemainder = byteLength % 3, mainLength = byteLength - byteRemainder,
                                    a, b, c, d, chunk;
    
                                    for (var i = 0; i < mainLength; i = i + 3) {
                                        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
                                        a = (chunk & 16515072) >> 18; b = (chunk & 258048) >> 12;
                                        c = (chunk & 4032) >> 6; d = chunk & 63;
                                        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
                                    }
        
                                    if (byteRemainder == 1) {
                                        chunk = bytes[mainLength];
                                        a = (chunk & 252) >> 2;
                                        b = (chunk & 3) << 4;
                                        base64 += encodings[a] + encodings[b] + '==';
                                    } else if (byteRemainder == 2) {
                                        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
                                        a = (chunk & 16128) >> 8;
                                        b = (chunk & 1008) >> 4;
                                        c = (chunk & 15) << 2;
                                        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
                                    }
                                    //console.log(base64);
                                //--
                                var image = $('[name=image_UserDetail_Photo]');
                                image.attr('src', "data:"+file.verified_type+";base64,"+base64);
                                var sFileName = file.name.split('.');
                                localStorage.setItem('image', "data:"+file.verified_type+";base64,"+base64);
                                //console.log(sFileName[0]);
                                localStorage.setItem('imageName', sFileName[0]);
                                $('#imageName').val("data:"+file.verified_type+";base64,"+base64);
                            }
                            imgReader.readAsArrayBuffer(file);
                            //$('[class=mobileimage1_div]').show();
                          } else {
                            //alert('Invalid filetype or file is too large.');
                                MessageDialog(appName, 'Invalid filetype or file is too large.');
                          }
                      
                    };
    //console.log(blob);
                    reader.readAsArrayBuffer(blob/*slice1*//*file*/);
