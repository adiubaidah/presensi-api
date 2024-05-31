-- SELECT
--     mhs.nim
-- FROM
--     public."Pertemuan" as per
--     INNER JOIN public."Pembelajaran" AS pemb ON pemb.id = per."pembelajaranId"
--     INNER JOIN public."Kelas" AS kelas ON pemb."kelasKode" = kelas.kode
--     INNER JOIN public."Mahasiswa" AS mhs ON kelas.kode = mhs."kelasKode"
-- WHERE per."statusTimer" = 'berjalan' AND ;
-- SELECT per."pembelajaranId" from public."Pertemuan" as per;
-- SELECT * FROM public."Pertemuan";
SELECT
    MAX(pemb.semester)
FROM
    public."Mahasiswa" as mhs
    INNER JOIN public."Kelas" AS kelas ON mhs."kelasKode" = kelas.kode
    INNER JOIN public."Pembelajaran" AS pemb ON pemb."kelasKode" = kelas.kode
WHERE mhs.nim = '2231740026';

SELECT
    *
FROM
    public."Mahasiswa";

SHOW search_path;