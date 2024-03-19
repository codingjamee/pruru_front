import ReceiptDetailCard from '../../_component/ReceiptDetailCard';

const page = ({ params }: { params: { receipt_id: string } }) => {
  console.log(params);
  return <ReceiptDetailCard receipt_id={params.receipt_id} />;
};

export default page;
