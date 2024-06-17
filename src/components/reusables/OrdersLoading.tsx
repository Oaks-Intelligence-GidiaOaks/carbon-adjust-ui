// import * as React from "react";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

// function Media() {
//   return (
//     <Grid container spacing={8}>
//       {Array.from({ length: 5 }, (_, i) => (
//         <Box key={i} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
//           <Skeleton variant="rectangular" width={310} height={304} />
//           <Box sx={{ pt: 0.5 }}>
//             <Skeleton />
//             <Skeleton width="60%" />
//           </Box>
//         </Box>
//       ))}
//     </Grid>
//   );
// }

export default function OrdersLoading() {
  return (
    <div className="w-[90%] mx-auto flex flex-col gap-4 ">
      {Array.from({ length: 3 }, (_, i) => (
        <Box key={i} sx={{ width: "100%" }}>
          <Skeleton variant="rectangular" width={"100%"} height={100} />
          <Skeleton width={"100%"} />
          <Skeleton width={"50%"} animation="wave" />
        </Box>
      ))}
    </div>
  );
}
