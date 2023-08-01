import React from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

const data = [
  {
    kodeBarang: 'A001',
    namaBarang: 'Amplop PPL 90 PPS',
    penjualanDesember: 257,
    peramalanJanuari: 147.8
  },
  {
    kodeBarang: 'A012',
    namaBarang: 'Amplop Coklat Tali Envelope B5',
    penjualanDesember: 238,
    peramalanJanuari: 187.2
  },
  {
    kodeBarang: 'A075',
    namaBarang: 'Buku Tulis Saku Borneo',
    penjualanDesember: 107,
    peramalanJanuari: 126.8
  },
  {
    kodeBarang: 'A109',
    namaBarang: 'Baterai Eveready A2 isi 10',
    penjualanDesember: 141,
    peramalanJanuari: 209.4
  },
  {
    kodeBarang: 'A110',
    namaBarang: 'Baterai Eveready A2 isi 2',
    penjualanDesember: 130,
    peramalanJanuari: 70
  },
  {
    kodeBarang: 'A113',
    namaBarang: 'Box File Joyko Plastik',
    penjualanDesember: 20,
    peramalanJanuari: 44
  },
  {
    kodeBarang: 'A115',
    namaBarang: 'Box File Joyko Kawat',
    penjualanDesember: 24,
    peramalanJanuari: 144.6
  },
  {
    kodeBarang: 'A116',
    namaBarang: 'Correction Tape Joyko Kecil',
    penjualanDesember: 6,
    peramalanJanuari: 24.4
  },
  {
    kodeBarang: 'A117',
    namaBarang: 'Correction Tape Joyko Merah',
    penjualanDesember: 31,
    peramalanJanuari: 94.4
  },
  {
    kodeBarang: 'A118',
    namaBarang: 'Correction Tape V-tec Kecil',
    penjualanDesember: 54,
    peramalanJanuari: 75.6
  },
  {
    kodeBarang: 'A119',
    namaBarang: 'Correction Tape V-tec Besar',
    penjualanDesember: 62,
    peramalanJanuari: 41.8
  },
  {
    kodeBarang: 'A124',
    namaBarang: 'Cutter Hore L-500',
    penjualanDesember: 11,
    peramalanJanuari: 90.4
  },
  {
    kodeBarang: 'A145',
    namaBarang: 'Double Tape 2" Busa 3M',
    penjualanDesember: 112,
    peramalanJanuari: 69.8
  },
  {
    kodeBarang: 'A147',
    namaBarang: 'Folder File Borneo F4',
    penjualanDesember: 102,
    peramalanJanuari: 121.8
  },
  {
    kodeBarang: 'A148',
    namaBarang: 'Folder File Borneo A4',
    penjualanDesember: 43,
    peramalanJanuari: 43.2
  },
  {
    kodeBarang: 'A149',
    namaBarang: 'Gunting M-2000 Kecil',
    penjualanDesember: 18,
    peramalanJanuari: 17.2
  },
  {
    kodeBarang: 'A150',
    namaBarang: 'Gunting M-2000 Sedang',
    penjualanDesember: 145,
    peramalanJanuari: 78
  },
  {
    kodeBarang: 'A155',
    namaBarang: 'Gunting Seng Besar',
    penjualanDesember: 196,
    peramalanJanuari: 153.4
  },
  {
    kodeBarang: 'A160',
    namaBarang: 'Isi Cutter Hore A-300',
    penjualanDesember: 108,
    peramalanJanuari: 150.2
  },
  {
    kodeBarang: 'A165',
    namaBarang: 'Jarum Jait Kecil',
    penjualanDesember: 305,
    peramalanJanuari: 207
  },
  {
    kodeBarang: 'A168',
    namaBarang: 'Kertas SIDU B5 70 Gsm',
    penjualanDesember: 44,
    peramalanJanuari: 102.6
  },
  {
    kodeBarang: 'A169',
    namaBarang: 'Kertas SIDU Quarto 70 Gsm',
    penjualanDesember: 76,
    peramalanJanuari: 166.4
  },
  {
    kodeBarang: 'A170',
    namaBarang: 'Kertas Sidu A4 70 Gsm',
    penjualanDesember: 18,
    peramalanJanuari: 102.2
  },
  {
    kodeBarang: 'A171',
    namaBarang: 'Kertas SIDU F4 70 Gsm',
    penjualanDesember: 50,
    peramalanJanuari: 177
  },
  {
    kodeBarang: 'A172',
    namaBarang: 'Kertas SIDU A3 70 Gsm',
    penjualanDesember: 2,
    peramalanJanuari: 48.8
  },
  {
    kodeBarang: 'A175',
    namaBarang: 'Kertas SIDU Quarto 80 Gsm',
    penjualanDesember: 62,
    peramalanJanuari: 113.8
  },
  {
    kodeBarang: 'A188',
    namaBarang: 'Kertas Photo Glosy Epson A4',
    penjualanDesember: 6,
    peramalanJanuari: 7.4
  },
  {
    kodeBarang: 'A210',
    namaBarang: 'Kertas Continous Form 2Ply SIDU',
    penjualanDesember: 48,
    peramalanJanuari: 48.2
  },
  {
    kodeBarang: 'A213',
    namaBarang: 'Lem Korea G',
    penjualanDesember: 99,
    peramalanJanuari: 96.6
  },
  {
    kodeBarang: 'A215',
    namaBarang: 'Lem Fox Botol Kecil',
    penjualanDesember: 10,
    peramalanJanuari: 10
  },
  {
    kodeBarang: 'A217',
    namaBarang: 'Lem Fox Botol Besar',
    penjualanDesember: 201,
    peramalanJanuari: 166.4
  },
  {
    kodeBarang: 'A218',
    namaBarang: 'Lem Fox Stick',
    penjualanDesember: 42,
    peramalanJanuari: 116.8
  },
  {
    kodeBarang: 'A219',
    namaBarang: 'Lem UHU Stick Besar',
    penjualanDesember: 67,
    peramalanJanuari: 172.8
  },
  {
    kodeBarang: 'A221',
    namaBarang: 'Lem UHU Stick Sedang',
    penjualanDesember: 82,
    peramalanJanuari: 144.8
  },
  {
    kodeBarang: 'A222',
    namaBarang: 'Lem Joyko Stick Kecil',
    penjualanDesember: 101,
    peramalanJanuari: 96.4
  },
  {
    kodeBarang: 'A229',
    namaBarang: 'Mika Transparant F4',
    penjualanDesember: 22,
    peramalanJanuari: 78.8
  },
  {
    kodeBarang: 'A245',
    namaBarang: 'Penggaris V-tec 20Cm',
    penjualanDesember: 35,
    peramalanJanuari: 43
  },
  {
    kodeBarang: 'A247',
    namaBarang: 'Penggaris V-Tec 50Cm',
    penjualanDesember: 37,
    peramalanJanuari: 48.8
  },
  {
    kodeBarang: 'A255',
    namaBarang: 'Pengghapus White Board',
    penjualanDesember: 43,
    peramalanJanuari: 29.2
  },
  {
    kodeBarang: 'A268',
    namaBarang: 'Pulpen Snowman V1 Hitam',
    penjualanDesember: 88,
    peramalanJanuari: 109.2
  },
  {
    kodeBarang: 'A269',
    namaBarang: 'Pulpen Snowman V1 Biru',
    penjualanDesember: 175,
    peramalanJanuari: 169
  },
  {
    kodeBarang: 'A270',
    namaBarang: 'Pulpen Snowman V1 Merah',
    penjualanDesember: 114,
    peramalanJanuari: 260.6
  },
  {
    kodeBarang: 'A274',
    namaBarang: 'Pulpen Snowman V5 Hitam',
    penjualanDesember: 101,
    peramalanJanuari: 165.4
  },
  {
    kodeBarang: 'A278',
    namaBarang: 'Pulpen Standart AE 7 Biru',
    penjualanDesember: 30,
    peramalanJanuari: 106
  },
  {
    kodeBarang: 'A285',
    namaBarang: 'Pulpen Drawing 0.3 Hitam',
    penjualanDesember: 50,
    peramalanJanuari: 140
  },
  {
    kodeBarang: 'A289',
    namaBarang: 'Pulpen Boxy Hitam',
    penjualanDesember: 12,
    peramalanJanuari: 133.8
  },
  {
    kodeBarang: 'A290',
    namaBarang: 'Pulpen Boxy Biru',
    penjualanDesember: 55,
    peramalanJanuari: 137
  },
  {
    kodeBarang: 'A291',
    namaBarang: 'Papan Jalar Joyko',
    penjualanDesember: 86,
    peramalanJanuari: 62.4
  },
  {
    kodeBarang: 'A318',
    namaBarang: 'Solatib Kabel Niron',
    penjualanDesember: 114,
    peramalanJanuari: 123.6
  },
  {
    kodeBarang: 'A319',
    namaBarang: 'Stapler Joyko Kecil',
    penjualanDesember: 129,
    peramalanJanuari: 160.6
  },
  {
    kodeBarang: 'A328',
    namaBarang: 'Staples Etona 20/17',
    penjualanDesember: 144,
    peramalanJanuari: 185.6
  },
  {
    kodeBarang: 'A331',
    namaBarang: 'Steples Tembak Besar',
    penjualanDesember: 136,
    peramalanJanuari: 158.4
  },
  {
    kodeBarang: 'A333',
    namaBarang: 'Stabilo Joyko Mini',
    penjualanDesember: 150,
    peramalanJanuari: 98
  },
  {
    kodeBarang: 'A337',
    namaBarang: 'Stop Map All Size',
    penjualanDesember: 25,
    peramalanJanuari: 45
  },
  {
    kodeBarang: 'A339',
    namaBarang: 'Spidol Snowman Board Marker',
    penjualanDesember: 61,
    peramalanJanuari: 281.4
  },
  {
    kodeBarang: 'A358',
    namaBarang: 'Tali Rafia Kecil',
    penjualanDesember: 45,
    peramalanJanuari: 43
  },
  {
    kodeBarang: 'A367',
    namaBarang: 'Toner Laser Jet HP 92298 A/X',
    penjualanDesember: 42,
    peramalanJanuari: 102.8
  },
  {
    kodeBarang: 'A375',
    namaBarang: 'Tinta Epson Ori 673 LM',
    penjualanDesember: 24,
    peramalanJanuari: 61.6
  },
  {
    kodeBarang: 'A376',
    namaBarang: 'Tinta Epson Ori 673 LC',
    penjualanDesember: 24,
    peramalanJanuari: 67.6
  },
  {
    kodeBarang: 'A377',
    namaBarang: 'Tinta Epson Ori 673 BK',
    penjualanDesember: 44,
    peramalanJanuari: 23.6
  },
  {
    kodeBarang: 'A378',
    namaBarang: 'Tinta Epson Ori 673 Y',
    penjualanDesember: 44,
    peramalanJanuari: 37.6
  },
  {
    kodeBarang: 'A379',
    namaBarang: 'Tinta Epson Ori 664 C',
    penjualanDesember: 46,
    peramalanJanuari: 43.4
  }
]

const ProductTable = () => {
  return (
    <Box p={4}>
      <Table
        variant="simple"
        style={{ borderColor: 'black', borderWidth: '1px' }}
      >
        <Thead>
          <Tr>
            <Th style={{ borderColor: 'black', borderWidth: '1px' }}>
              Kode Barang
            </Th>
            <Th style={{ borderColor: 'black', borderWidth: '1px' }}>
              Nama Barang
            </Th>
            <Th style={{ borderColor: 'black', borderWidth: '1px' }}>
              Penjualan Desember
            </Th>
            <Th style={{ borderColor: 'black', borderWidth: '1px' }}>
              Peramalan Januari
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(item => (
            <Tr key={item.kodeBarang}>
              <Td style={{ borderColor: 'black', borderWidth: '1px' }}>
                {item.kodeBarang}
              </Td>
              <Td style={{ borderColor: 'black', borderWidth: '1px' }}>
                {item.namaBarang}
              </Td>
              <Td style={{ borderColor: 'black', borderWidth: '1px' }}>
                {item.penjualanDesember}
              </Td>
              <Td style={{ borderColor: 'black', borderWidth: '1px' }}>
                {item.peramalanJanuari}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default ProductTable
