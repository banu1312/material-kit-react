import { ImageList,ImageListItem, ImageListItemBar } from "@mui/material";

function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
export default function Imagelist(){
    
    return(
        <ImageList
        sx={{
            width: '100%',
            objectFit:'cover',
            objectPosition:'center',
            height: 450,
            // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
            transform: 'translateZ(0)',
        }}
      rowHeight={200}
      gap={1}
    >
      {itemData.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem key={item.img} cols={cols} rows={rows}>
            <img
              {...srcset(item.img, 250, 200, rows, cols)}
              alt={item.title}
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={item.title}
              position="top"
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
    )
}
const itemData = [
  {
    img: '/assets/images/Masjid/Masjid1.png',
    title: 'Tampak Luar Masjid Al-Huda',
    author: '@Smkn24',
    featured: true,
  },
  {
    img: '/assets/images/Masjid/Masjid3.png',
    title: 'Tampak Dalam Masjid Al-Huda',
    author: '@Smkn24',
  },
    {
      img: '/assets/images/Masjid/Masjid4.png',
      title: 'Desain Masjid',
      author: '@Smkn24',
      // featured:true
    },
  ];