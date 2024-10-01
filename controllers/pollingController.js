// pollingController.js
const pollingService = require('./pollingService');

// 폴링 요청 처리
const handlePollingRequest = async (req, res) => {
  const { placeId } = req.body; // 프론트엔드에서 받은 장소 ID
  try {
    const data = await pollingService.getPollingData(placeId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
};

module.exports = {
  handlePollingRequest,
};
