import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../models/pagination.interface";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
    const { totalPages, currentPage, totalCount, pageSize } = metaData;
    const from = (currentPage - 1) * pageSize + 1;
    const to = currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize;

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>Displaying {from}-{to} of {totalCount} items</Typography>
        <Pagination
          color="secondary"
          size="large"
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => onPageChange(page)}
        ></Pagination>
      </Box>
    )
}