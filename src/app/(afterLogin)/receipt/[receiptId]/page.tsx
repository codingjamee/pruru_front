import ReceiptDetailCard from '../../_component/ReceiptDetailCard';

const page = ({ params }: { params: { receiptId: string } }) => {
  return <ReceiptDetailCard receiptId={params.receiptId} />;
};

export default page;
