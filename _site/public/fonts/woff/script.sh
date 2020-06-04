# woff2
pyftsubset "HelveticaNeue-Bold.ttf" --output-file="HelveticaNeue-Bold.woff2" --flavor=woff2 --layout-features="ccmp,locl,mark,mkmk,kern" --desubroutinize --unicodes=U+0-10FFFF
pyftsubset "HelveticaNeue-Regular.ttf" --output-file="HelveticaNeue-Regular.woff2" --flavor=woff2 --layout-features="ccmp,locl,mark,mkmk,kern" --desubroutinize --unicodes=U+0-10FFFF

# woff
pyftsubset "HelveticaNeue-Bold.ttf" --output-file="HelveticaNeue-Bold.woff" --flavor=woff2 --layout-features="ccmp,locl,mark,mkmk,kern" --desubroutinize --unicodes=U+0-10FFFF
pyftsubset "HelveticaNeue-Regular.ttf" --output-file="HelveticaNeue-Regular.woff" --flavor=woff2 --layout-features="ccmp,locl,mark,mkmk,kern" --desubroutinize --unicodes=U+0-10FFFF
