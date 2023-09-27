# Merges sitemaps, to be called from the root directory
header, footer, content_main, content_2x, content_3x = []

File.open( "_site/sitemap.xml", 'r' ) do |f1|
    content_main = (IO.readlines f1)
    header = content_main.slice!( 0..11 )
    footer = [ content_main.slice!( -1 ) ]
end

File.open( ".submodules/wiremock.org-2.x/tmp/site_2x/sitemap.xml", 'r' ) do |f2|
    content_2x = (IO.readlines f2)
    content_2x.slice!( 0..11 )
    content_2x.slice!( -1 ) 
end

File.open( "./tmp/site_3x/sitemap.xml", 'r' ) do |f3|
    content_3x = (IO.readlines f3)
    content_3x.slice!( 0..11 )
    content_3x.slice!( -1 ) 
end

File.open( "_site/sitemap.xml", 'w' ) do |f4|
    f4.write ( header + content_main + content_2x + content_3x + footer ).join()
end


puts "Merged main and version sitemaps"
