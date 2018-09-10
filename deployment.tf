terraform {
  backend "gcs" {
    bucket = "middle-management-bot-terraform-state"
  }
}

provider "google" {
  project = "middle-management-bot"
  region = "us-central1"
  credentials = "${file("gcs-account.json")}"
}

data "archive_file" "source" {
  type = "zip"
  output_path = "${path.module}/archive.zip"
  source_file = "${file("${path.module}/lib/index.js")}"
}

resource "google_storage_bucket" "bucket" {
  name = "middle-management-bot-source"
}

resource "google_storage_bucket_object" "archive" {
  name = "source.zip"
  bucket = "${google_storage_bucket.bucket.name}"
  source = "${path.module}/archive.zip"
  depends_on = [ "data.archive_file.source" ]
}

resource "google_cloudfunctions_function" "function" {
  name = "middle-management-bot"
  description = "A bot to automate common busywork on Github"
  available_memory_mb = 128
  source_archive_bucket = "${google_storage_bucket.bucket.name}"
  source_archive_object = "${google_storage_bucket_object.archive.name}"
  trigget_http = true
  entry_point = "main"
}
