import Image from "next/image";
import { Screen } from "@/components/screen";

export default function HomePage() {
	return (
		<div>
			<div
				className="absolute w-full px-16 py-8 text-right mb-20"
			>
				<div
					className="text-4xl text-[#bebebe] font-bold"
				>
					SAMSUNG
				</div>
			</div>
			<div
				className="fixed top-0 left-0 w-full h-full -z-10"
			>
				<Image
					src="/gradient (4).svg"
					alt=""
					fill
					className="object-cover pointer-events-none select-none -scale-x-100 brightness-[45%]"
				/>
			</div>
			<div
				className="flex flex-row justify-center"
			>
				<div
					className="w-full"
				>

				</div>
				<div
					className="w-fit flex flex-row"
				>
					<div
						className="bg-gradient-to-l from-black w-2 h-full"
					/>
					<div
						className="bg-black w-2 h-full"
					/>
					<div
						className="bg-gradient-to-r from-black w-2 h-full"
					/>
				</div>
				<div
					className="w-full text-center pt-48"
				>
					<Screen
						className="w-full mx-auto"
					/>
				</div>
			</div>
		</div>
	);
}