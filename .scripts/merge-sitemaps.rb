# Merges sitemaps, to be called from the root directory
header, footer, content1, content2 = []

File.open( "_site/sitemap.xml", 'r' ) do |f1|
    content1 = (IO.readlines f1)
    header = content1.slice!( 0..11 )
    footer = [ content1.slice!( -1 ) ]
end

File.open( ".submodules/wiremock.org-2.x/tmp/site_2x/sitemap.xml", 'r' ) do |f2|
    content2 = (IO.readlines f2)
    content2.slice!( 0..11 )
    content2.slice!( -1 ) 
end

File.open( "_site/sitemap.xml", 'w' ) do |f3|
    f3.write ( header + content1 + content2 + footer ).join()
end


puts "Merged main and 3.x sitemaps"
