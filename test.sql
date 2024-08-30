-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2024 at 08:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `job_seeker_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` varchar(35) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `created_at`) VALUES
('a27a5ad8-18b3-4c8e-9600-53414baaf9b', 'admin', '$2a$12$8.LrXNEK8cXymlmDb1CtrOmF9u4UMSE6b7/qMGuyXJLyG/D3DxSoG', '2024-08-27 05:27:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(35) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `resume_path` varchar(255) DEFAULT NULL,
  `status` enum('Pending','Accepted','Rejected') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone_number`, `resume_path`, `status`, `created_at`) VALUES
('5bdd8d4a-2c46-4f12-9dc9-ba6ca677d67', 'John Smithh', 'johnsmith02@gmail.com', '56498624984', 'uploads\\resumes\\resume-1725003669538.pdf', 'Pending', '2024-08-30 07:41:09'),
('a70b0a09-d1ee-47f8-8a5d-9009e53dd78', 'tulasigeri', 'tulasigeri@gmail.com', '123456789', 'uploads\\resumes\\resume-1724742071422.pdf', 'Accepted', '2024-08-27 07:01:11'),
('b4ee5d6a-8f46-4523-ad06-8c79ec76d52', 'test', 'test@gmail.com', '123456765432', 'uploads\\resumes\\resume-1725042697002.pdf', 'Pending', '2024-08-30 18:31:37'),
('fbafc3a1-8326-42c6-acf5-ccbd9905c8b', 'Vijayalaxmi Koddannavar', 'vijjukoddaaa@gmail.com', '1431439999', 'uploads\\resumes\\resume-1725007698436.pdf', 'Pending', '2024-08-30 08:48:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
