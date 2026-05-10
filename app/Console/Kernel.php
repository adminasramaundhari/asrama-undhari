protected function schedule(Schedule $schedule)
{
    $schedule->command('payment:reminder')->dailyAt('08:00');
}