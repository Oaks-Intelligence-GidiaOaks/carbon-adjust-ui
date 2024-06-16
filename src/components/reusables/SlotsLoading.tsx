import { Box, Grid, Skeleton } from "@mui/material";

function Media() {
  //   const { loading = false } = props;

  return (
    <Grid spacing={18} container wrap="nowrap">
      {Array.from({ length: 3 }, (_, i) => (
        <Box key={i} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={210} height={164} />
        </Box>
      ))}
    </Grid>
  );
}

export default function SlotsLoading() {
  return (
    <div className="w-[90%] my-5 mx-auto ">
      <Box sx={{ overflow: "hidden" }}>
        <Media />
      </Box>
    </div>
  );
}
